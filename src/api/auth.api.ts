import { api } from "./client";

export const loginRequest = (user: string, password: string) => {
  return api.post("/login/", { user, password });
  
};

// export const register = (data: Record<string, unknown>) => {
//     console.log("Registering with:", JSON.stringify(data))
//   return api.post("/signup/", data);
  
// };


export const register = async (data: Record<string, unknown>) => {
  const formData = new FormData();

  formData.append("email", data.email as string);
  formData.append("username", data.username as string);
  formData.append("password", data.password as string);
  formData.append("confirm_password", data.confirm_password as string);
  formData.append("bio", data.bio as string);
  formData.append("age", data.age as string);
  formData.append("gender", data.gender as string);
  formData.append("interested_in", data.interested_in as string);
  formData.append("interests", (data.interests as string[]).join(","));

  const photo = data.photo as any;
  if (photo) {
    formData.append("photo", {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.mimeType,
    } as any);
  }

  const response = await fetch("http://192.168.1.10:8000/api/signup/", {
    method: "POST",
    body: formData,
    // ✅ DO NOT set Content-Type header with fetch either
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Signup error:", JSON.stringify(errorData));
    throw new Error(JSON.stringify(errorData));
  }

  const responseData = await response.json();
  return { data: responseData }; // wrap in { data } to match axios format
};