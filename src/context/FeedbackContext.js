import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../feedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const handleFeedbackDelete = (id) => {
    const newFeedBack = feedback.filter((item) => item.id !== id);
    setFeedback(newFeedBack);
  };

  const handleAddFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updatefeedbackitem = (id, upditem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...upditem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        handleFeedbackDelete,
        handleAddFeedback,
        editFeedback,
        feedbackEdit,
        updatefeedbackitem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
