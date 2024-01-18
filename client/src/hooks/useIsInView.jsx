/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

export default function useIsInView() {
  const [reservationCardInView, setReservationCardInView] = useState(false);
  const [reviewsInView, setReviewsInView] = useState(false);
  const [topValue, setTopValue] = useState(0);

  const reservationCardRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, //use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.5, //Trigger when 50% of the target is visible
    };

    const reservationCardObserver = new IntersectionObserver((entries) => {
      // entries is an array of observed elements
      const entry = entries[0];
      setReservationCardInView(entry.isIntersecting);
    }, options);

    const reviewsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setReviewsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          if (reservationCardRef && reviewsRef) {
            setTopValue(entry.boundingClientRect.top + window.scrollY);
          }
        }
      },
      { ...options, threshold: 0.5 }
    );

    // Start observing the reservationCardRef element
    if (reservationCardRef.current) {
      reservationCardObserver.observe(reservationCardRef.current);
    }

    if (reviewsRef.current) {
      reviewsObserver.observe(reviewsRef.current);
    }
    // cleanup the observer when the component is unmounted
    return () => {
      if (reservationCardRef.current) {
        reservationCardObserver.unobserve(reservationCardRef.current);
      }
      if (reviewsRef.current) {
        reviewsObserver.unobserve(reviewsRef.current);
      }
    };
  }, []);

  return {
    reservationCardRef,
    reviewsRef,
    reservationCardInView,
    reviewsInView,
    topValue,
  };
}
