import { z } from "zod";

export const userSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  no_hp: z.string()
    .regex(/^[0-9]+$/, "Nomor HP hanya boleh angka")
    .min(10, "Nomor HP minimal 10 digit"),
  statusAktif: z.boolean(),
  department: z.string().min(1, "Department wajib diisi")
});
