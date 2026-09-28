import { z } from "zod";

// ============================================================================
// Shared field-level rules — defined once, reused across every schema below,
// so a rule change (e.g. password length) only needs editing in one place.
// ============================================================================

const phoneField = z
  .string()
  .trim()
  .length(10, "Enter a valid 10-digit phone number")
  .regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number");

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .email("Enter a valid email address");
 
const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be under 72 characters")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character (!@#$...)")
  .refine((val) => !/\s/.test(val), "Password cannot contain spaces")
  .refine((val) => !/(.)\1{3,}/.test(val), "Avoid 4+ repeated characters in a row");

const otpField = z
  .string()
  .length(6, "Enter the 6-digit code")
  .regex(/^\d{6}$/, "Code must be 6 digits");

const fullNameField = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(60, "Name is too long")
  .regex(/^[a-zA-Z\s'.-]+$/, "Name can only contain letters and spaces");


// ============================================================================
// 1. PHONE AUTH — "Continue with phone" flow
// ============================================================================

// Step 1: requesting the OTP — just the phone number
export const phoneRequestSchema = z.object({
  phone: phoneField,
});
export type PhoneRequestInput = z.infer<typeof phoneRequestSchema>;

// Step 2: verifying the OTP the user received
export const otpVerifySchema = z.object({
  phone: phoneField, // carried over from step 1, not re-entered by the user
  otp: otpField,
});
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;


// ============================================================================
// 2. EMAIL SIGNUP
// ============================================================================


 
 
// ============================================================================
// Signup schema — email + password, matching your signup screen's fields
// ============================================================================
 
export const signupSchema = z
  .object({
    email: emailField,
    password: passwordField,
  })
  .refine((data) => data.password.toLowerCase() !== data.email.toLowerCase(), {
    message: "Password cannot be the same as your email",
    path: ["password"],
  })
  .refine(
    (data) => !data.password.toLowerCase().includes(data.email.split("@")[0].toLowerCase()),
    {
      message: "Password shouldn't contain part of your email",
      path: ["password"],
    }
  );
 
export type SignupInput = z.infer<typeof signupSchema>;
 
// ============================================================================
// 3. EMAIL LOGIN
// ============================================================================

export const loginSchema = z.object({
  email: emailField,
  // Login intentionally does NOT re-run the strength regex — a returning
  // user's existing password may predate a rule change. Only length is
  // checked here; strength is only enforced at signup / password-reset time.
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;


// ============================================================================
// 4. PROFILE SETUP — the "tell us about you" step after verification
// ============================================================================

export const profileSetupSchema = z.object({
  fullName: fullNameField,
  email: emailField.optional().or(z.literal("")), // optional when signing up via phone
});

export type ProfileSetupInput = z.infer<typeof profileSetupSchema>;