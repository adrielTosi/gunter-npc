/**
 * Check if fields sent by request [PATCH] are valid based on a list
 * of possible fields
 * @param {Array} reqUpdates - Array of fields sent by Request
 * @param {Array} validUpdates - Array of Fields contained in the original Model
 */
const validateUpdateFields = (reqUpdates, validUpdates) => {
  const updates = Object.keys(reqUpdates);
  return updates.every(update => validUpdates.includes(update));
};

module.exports = validateUpdateFields;
