import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import cloudinary from '../utils/cloudinary.js';
import { getPublicIdFromUrl } from '../utils/getPublicFormUrl.js';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mail/emails.js';
export const checkAuth = async (request, response) => {
    try {
        const user = await User.findById(request.userId).select('-password');
        if (!user) {
            return response.status(404).json({ success: false, message: 'error no user is authenticated!!' });
        }
        return response.status(200).json({ success: true, user });
    } catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};
export const signup = async (request, response) => {
    const { email, username, firstName, lastName, password, confirmPassword } = request.body;
    try {
        if (!email || !username || !firstName || !lastName || !password || !confirmPassword) {
            return response.status(404).json({ success: false, message: "some fields are required!!" });
        }
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let ErrorAuth = '';
        let count = 0;
        if (firstName.length < 4) {
            ErrorAuth += 'First Name length should be at least 4';
            count++;
        }
        if (lastName.length < 4) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Last Name length should be at least 4';
            count++;
        }
        if (username.length < 6) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Username length should be at least 6';
            count++;
        }
        if (password.length < 8) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Password length should be at least 8';
            count++;
        }
        if (!isEmailValid) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Email not valid';
            count++;
        }
        if (count > 0) {
            return response.status(400).json({ success: false, message: ErrorAuth });
        }
        if (password !== confirmPassword) {
            return response.status(400).json({ success: false, message: "Passwords do not match" });
        }
        const userAlreadyExist = await User.findOne({ email, username });
        if (userAlreadyExist) {
            return response.status(400).json({ success: false, message: "username or email already exist!!" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();
        generateTokenAndSetCookie(response, user._id);
        sendVerificationEmail(user.email, verificationToken);
        return response.status(201).json({
            success: true,
            message: "user has been created successfully!!",
            user: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        return response.status(404).json({ success: false, message: error.message })
    }
};
export const verifyEmail = async (request, response) => {
    const { code } = request.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return response.status(400).json({ success: false, message: "Invalid code or expired verification code!!" });
        }
        user.isVerified = true;
        user.verificationTokenExpiresAt = undefined;
        user.verificationToken = undefined;
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        response.status(200).json({
            success: true, message: `Welcome ${user.name}!!`,
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        return response.status(404).json({ success: false, message: error.message });
    }
};
export const login = async (request, response) => {
    const { username, password } = request.body;
    try {
        if (!username || !password) {
            return response.status(404).json({ success: false, message: "Username or password is empty!!" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(404).json({ success: false, message: 'Invalid credentials!!' });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(404).json({ success: false, message: 'Invalid credentials!!' });
        }
        generateTokenAndSetCookie(response, user._id);
        user.lastLogin = Date.now();
        await user.save();
        return response.status(200).json({
            success: true,
            message: 'Login successfully!!',
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};
export const logout = async (request, response) => {
    response.clearCookie('token');
    response.status(200).json({ success: true, message: "you have been logged out successfully!!" });
};
export const forgotPassword = async (request, response) => {
    const { email } = request.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ success: false, message: "User doesn't exist!!" });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        return response.status(200).json({ success: true, message: "password link sent successfully!!" });
    } catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};
export const resetPassword = async (request, response) => {
    try {
        const { token } = request.params;
        const { password } = request.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return response.status(404).json({ success: false, message: 'Invalid or expired reset token' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        sendResetSuccessEmail(user.email);
        return response.status(200).json({ success: true, message: 'Password has been changed successfully!!' });
    } catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};
export const editUser = async (request, response) => {
    const { newUsername, newFirstName, newLastName, userId } = request.body;
    const newProfilePicture = request.file;
    try {
        if (!userId) {
            return response.status(400).json({ success: false, message: "User ID is required." });
        }
        if (!newUsername && !newFirstName && !newLastName && !newProfilePicture) {
            return response.status(400).json({
                success: false,
                message: 'At least one field (username, firstName,lastName, or picture) must be provided.'
            });
        }
        let ErrorAuth = '';
        let count =0;
        if (newFirstName && newFirstName.length < 4) {
            ErrorAuth += 'First Name length should be at least 4';
            count++;
        }
        if (newLastName && newLastName.length < 4) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Last Name length should be at least 4';
            count++;
        }
        if (newUsername && newUsername.length < 6) {
            if (count > 0) ErrorAuth += ' ';
            ErrorAuth += 'Username length should be at least 6';
            count++;
        }
        if (count > 0) {
            return response.status(400).json({ success: false, message: ErrorAuth });
        }
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ success: false, message: 'User not found.' });
        }
        if (newUsername) {
            const checkUserName = await User.find({ username: newUsername });
            if (checkUserName) {
                return response.status(404).json({ success: false, message: 'Username is repeated!!' });
            }
            user.username = newUsername;
        }
        if (newFirstName) user.firstName = newFirstName;
        if (newLastName) user.lastName = newLastName;
        if (newProfilePicture) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'users' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(newProfilePicture.buffer);
            });
            if (user.profilePicture && user.profilePicture !== '/') {
                const publicId = getPublicIdFromUrl(user.profilePicture, 'users');
                await cloudinary.uploader.destroy(publicId);
            }
            user.profilePicture = uploadResult.secure_url;
        }
        await user.save();
        return response.status(200).json({
            success: true,
            message: `All information has been changed successfully!!`, user
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};