import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './HotelFAQ.module.scss';

const faqData = [
  {
    question: 'How do I find cheap hotels on Zuong Booking?',
    answer: `There are a number of ways to find cheap hotels on Booking.com. You can filter hotels by price to show only those that match your budget, or you can sort by price to display the cheapest hotels first. If you are a member of our Genius loyalty programme, you can also enjoy discounted rates at select hotels and other properties.`,
  },
  {
    question: 'Where can I find hotel deals on Zuong Booking?',
    answer: `We have a range of different hotel deals and promotions running throughout the year, all of which can be found on our dedicated deals page. If you're a member of our Genius loyalty programme, you can also sign in to your account to see discounted rates at select hotels and other properties.`,
  },
  {
    question: 'How many hotels are listed on Zuong Booking?',
    answer: `There are currently 21,657,217 hotel room listings on Booking.com, so you'll always be able to find the perfect hotel – wherever it is you're going!`,
  },
  {
    question: 'How do I search for a hotel on Zuong Booking?',
    answer: `To search for a hotel on Booking.com, all you need to enter are your destination, dates of travel and the number of people travelling in your group. Don't know yet where or when you want to travel? You can also browse our site to get inspiration and find your perfect hotel that way, instead.`,
  },
  {
    question: 'How do I find cheap last minute hotels on Zuong Booking?',
    answer: `To look for a cheap last minute hotel on Booking.com, enter your upcoming dates to search for a hotel and then use the budget filters to find a hotel within your price range.`,
  },
  {
    question: `Why can I trust Zuong Booking's hotel review?`,
    answer: `You can trust Booking.com hotel reviews because guests can only leave a review once they have stayed at a hotel. This means you get verified reviews written by real Booking.com guests.`,
  },
];

const HotelFAQ = () => {
  const [currentFAQ, setCurrentFAQ] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleOpenFAQ = (index: number) => {
    const newCurrentFAQ = [...currentFAQ];
    newCurrentFAQ[index] = !newCurrentFAQ[index];
    setCurrentFAQ(newCurrentFAQ);
  };

  return (
    <div className={styles['hotel-faq']}>
      <div className={styles['hotel-faq__title']}>
        FAQs about hotels on Zuong Booking
      </div>
      <div className={styles['hotel-faq__question']}>
        {faqData.map((data, index) => (
          <div className={styles['hotel-faq__question__item']} key={index}>
            <button
              className={styles['hotel-faq__question__item__question']}
              onClick={() => handleOpenFAQ(index)}
              style={{
                borderBottom: `${
                  currentFAQ[index] ? 'none' : `${index !== 5 ? 'none' : ''}`
                }`,
              }}
            >
              <p>{data.question}</p>
              <FontAwesomeIcon
                icon={currentFAQ[index] ? faChevronUp : faChevronDown}
                size="xs"
              />
            </button>
            {currentFAQ[index] && (
              <p
                className={styles['hotel-faq__question__item__answer']}
                style={{
                  borderTop: `${currentFAQ[index] ? 'none' : ''}`,
                  borderBottom: `${
                    currentFAQ[index] && index !== 5 ? 'none' : ''
                  }`,
                }}
              >
                {data.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFAQ;
