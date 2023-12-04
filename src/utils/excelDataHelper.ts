export function applicationToExcelData(application) {
  return {
    id: application.id,
    mentorId: application.mentorId,
    Tên: application.displayName,
    "Ngày nộp": application.createdAt,
    SDT: application.phoneNumber,
    Email: application.email,
    "Ảnh chứng chỉ": application.imageUrls.join(", "),
    "Mô tả": application.description,
  };
}
