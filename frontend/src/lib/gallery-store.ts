export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tagColor: string;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'om-campus-aerial',
    title: 'Modern School Campus & Lush Green Playgrounds',
    category: 'Campus & Building',
    image: '/images/om-hero-campus-hd.jpg',
    description:
      'Scenic wide-angle view of Om Public School, Dabra featuring our multi-story architectural building, paved walkways, and serene academic atmosphere.',
    tagColor: 'bg-[#0D2056]',
  },
  {
    id: 'om-smart-class-hd',
    title: 'Digital Smart Classroom with Interactive Teaching',
    category: 'Smart Classrooms',
    image: '/images/om-smart-classroom.jpg',
    description:
      'Audio-visual digital whiteboards making foundational concepts in mathematics, science, and phonics engaging and interactive for our students.',
    tagColor: 'bg-[#76A136]',
  },
  {
    id: 'om-computer-lab-hd',
    title: 'Hi-Tech Computer Science & Coding Lab',
    category: 'Computer & STEM Lab',
    image: '/images/om-computer-lab.jpg',
    description:
      'Individual desktop workstations with high-speed connectivity where students master digital literacy, typing, logic, and early coding skills.',
    tagColor: 'bg-[#1565C0]',
  },
  {
    id: 'om-sports-ground-hd',
    title: 'Annual Sports Day & Athletic Sprinting Track',
    category: 'Sports & Athletics',
    image: '/images/om-sports-ground.jpg',
    description:
      'Vibrant athletic competitions, relay races, and outdoor fitness games on our dedicated sports field building stamina and sportsmanship.',
    tagColor: 'bg-[#D32F2F]',
  },
  {
    id: 'om-library-hd',
    title: 'Knowledge Vault & Children Reading Library',
    category: 'Library & Reading',
    image: '/images/om-library.jpg',
    description:
      'Peaceful reading lounge stocked with thousands of illustrated storybooks, encyclopedias, and periodicals to ignite a lifelong love of literature.',
    tagColor: 'bg-[#E87722]',
  },
  {
    id: 'om-poster-official',
    title: 'Official Admission Open Campaign Session 2027–28',
    category: 'Events & Celebrations',
    image: '/images/om-public-school-poster.jpg',
    description:
      'Official admission announcement for Playgroup to 8th Standard highlighting English Medium education and experienced faculty.',
    tagColor: 'bg-[#D32F2F]',
  },
  {
    id: 'om-building-modern',
    title: 'Campus Front Entrance & Administrative Block',
    category: 'Campus & Building',
    image: '/images/om-school-building.jpg',
    description:
      'Secure gated entrance at Deedar Colony, Dabra with CCTV surveillance, visitor checkpoint, and welcoming school facade.',
    tagColor: 'bg-[#0D2056]',
  },
];

const STORAGE_KEY = 'om_public_school_gallery_items_v2';

export function getStoredGalleryItems(): GalleryItem[] {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
      return DEFAULT_GALLERY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_GALLERY_ITEMS;
  } catch {
    return DEFAULT_GALLERY_ITEMS;
  }
}

export function saveStoredGalleryItems(items: GalleryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('gallery-updated'));
  } catch (e) {
    console.error('Failed to save gallery items:', e);
  }
}
