import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  // Get data of all cabins (rows)
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Check if new image is added
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // Keep the original image if no new image is added
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create query
  let query = supabase.from("cabins");
  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabins cannot be created");
  }

  if (hasImagePath) return data; // No need to upload image again
  // 2. Upload image
  //https://supabase.com/docs/reference/javascript/storage-from-upload

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins cannot be deleted");
  }

  return data;
}
