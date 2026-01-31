export const handleFileUpload = async (file:any) => {
  if (!file) return null;
  if (typeof file === 'string') return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  }) as any;
};