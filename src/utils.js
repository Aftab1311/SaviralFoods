export const convertImageToBase64 = (file) => {
  let TYPED_ARRAY = new Uint8Array(file?.data);
  const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
    return data + String.fromCharCode(byte);
  }, "");
  let base64String = btoa(STRING_CHAR);
  return `data:image/jpg;base64,${base64String}`;
};
