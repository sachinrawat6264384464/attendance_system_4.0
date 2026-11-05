export interface SchoolProfile {
  schoolName: string;
  schoolCode: string;
  affiliationNo: string;
  email: string;
  phone: string;
  address: string;
  admissionBannerText: string;
  tagline: string;
  sessionYear: string;
}

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  schoolName: 'Om Public School Dabra',
  schoolCode: 'OPS-DABRA',
  affiliationNo: 'MP-GWL-2027-OPS',
  email: 'info@ompublicschool.edu.in',
  phone: '+91 7999083379, +91 9516469021',
  address: 'Deedar Colony, Dabra, District Gwalior (M.P.)',
  admissionBannerText: 'Admission Open: Session 2027–28 (Classes: PG to 8th)',
  tagline: 'Quality Education for a Better Tomorrow',
  sessionYear: '2026-2027',
};

const SCHOOL_STORAGE_KEY = 'om_public_school_profile_v2';

export function getStoredSchoolProfile(): SchoolProfile {
  if (typeof window === 'undefined') return DEFAULT_SCHOOL_PROFILE;
  try {
    const raw = localStorage.getItem(SCHOOL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(DEFAULT_SCHOOL_PROFILE));
      return DEFAULT_SCHOOL_PROFILE;
    }
    return { ...DEFAULT_SCHOOL_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SCHOOL_PROFILE;
  }
}

export function saveStoredSchoolProfile(profile: SchoolProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCHOOL_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('school-profile-updated'));
  } catch (e) {
    console.error('Failed to save school profile:', e);
  }
}

