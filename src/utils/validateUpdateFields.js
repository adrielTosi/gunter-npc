/**
 * Check if fields sent by request [PATCH] are valid based on a list
 * of possible fields
 * @param {Array} reqUpdates - Array of fields sent by Request
 * @param {Array} validUpdates - Array of Fields contained in the original Model
 */
const validateUpdateFields = (reqUpdates, validUpdates) => {
  const updatesArray = Object.keys(reqUpdates);
  const isValidUpdate = updatesArray.every(update =>
    validUpdates.includes(update)
  );
  return { updatesArray, isValidUpdate };
};

module.exports = validateUpdateFields;
