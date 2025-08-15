import React from 'react'
const FAQItem = ({ question, answer }) => {
  return (
      <div className="flex flex-col gap-2">
          <h2 className="text-white text-lg font-josefinSans font-semibold">{question}</h2>
          <p className="text-white/50 text-sm font-josefinSans">{answer}</p>
      </div>
  )
}
export default FAQItem;
