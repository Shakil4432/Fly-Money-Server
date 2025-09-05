"use server";

export const getAllBanner = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/banner`, {
      next: {
        tags: ["Banner"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
