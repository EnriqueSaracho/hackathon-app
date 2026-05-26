import { z } from "zod";

const baseFields = {
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  school: z.string().min(2, "School is required"),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  dietaryNotes: z.string().optional(),
  agreedToCoC: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the Code of Conduct",
    }),
};

export const hackerSchema = z.object({
  ...baseFields,
  teamPreference: z.enum(["solo", "have-team", "find-team"]),
});

export const mentorSchema = z.object({ ...baseFields });

export const volunteerSchema = z.object({ ...baseFields });

export type HackerFormData = z.infer<typeof hackerSchema>;
export type MentorFormData = z.infer<typeof mentorSchema>;
export type VolunteerFormData = z.infer<typeof volunteerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["attendee", "staff", "organizer"]),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
