import { z } from "zod";

export const UploadSchema = z.object({
  file: z.instanceof(File)
})