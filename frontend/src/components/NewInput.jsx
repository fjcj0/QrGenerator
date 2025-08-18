const NewInput = ({ icon: Icon, ...props }) => {
    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size-5 text-gray-400' />
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border text-gray-400 placeholder-gray-400 transition duration-200'
            />
        </div>
    );
};
export default NewInput;