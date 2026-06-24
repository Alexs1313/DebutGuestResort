export type QACategory =
  | 'Access'
  | 'Opening'
  | 'Reservation'
  | 'Events'
  | 'Dining'
  | 'Services'
  | 'Requests';

export type QAItem = {
  id: string;
  question: string;
  answer: string;
  category: QACategory;
};

export const QA_ITEMS: QAItem[] = [
  {
    id: 'how-to-use-pass',
    question: 'How do I use the opening pass?',
    answer:
      'Open the Pass screen, increase your brightness if needed, and present the code to venue staff when access verification is requested.',
    category: 'Access',
  },
  {
    id: 'activate-before-visit',
    question: 'Can I activate the app before visiting the venue?',
    answer:
      'Some tools may be previewed before arrival, but full access can be activated during your venue visit with staff verification.',
    category: 'Access',
  },
  {
    id: 'how-reserve-opening',
    question: 'How do I reserve a place for an opening event?',
    answer:
      'Open the Opening tab, choose an opening moment, tap Reserve Place, fill in your details, and send the request.',
    category: 'Reservation',
  },
  {
    id: 'where-opening-events',
    question: 'Where can I see the opening night schedule?',
    answer:
      'Open the Opening tab to view all opening night moments, times, locations, and reservation options.',
    category: 'Opening',
  },
  {
    id: 'where-after-events',
    question: 'Where can I see events after the opening?',
    answer:
      'Open the Events tab to view the after-opening calendar, filters, and upcoming event cards.',
    category: 'Events',
  },
  {
    id: 'how-request-service',
    question: 'How do I request a guest service?',
    answer:
      'Open Services, choose a service card, tap Request Service, fill in the form, review your details, and send the request.',
    category: 'Services',
  },
  {
    id: 'request-parking',
    question: 'Can I request parking in the app?',
    answer:
      'Yes. Open Services, choose Parking Place Request, fill in your preferred parking details, and send the request for review.',
    category: 'Services',
  },
  {
    id: 'where-review-requests',
    question: 'Where can I review requests I already sent?',
    answer:
      'Open Services and tap View Submitted Requests to see service requests, event bookings, and dining orders in one place.',
    category: 'Requests',
  },
  {
    id: 'how-dining-order',
    question: 'Can I prepare a dining order from the menu?',
    answer:
      'Yes. Open Dining, choose items, review your order, fill in your details, and send the dining request.',
    category: 'Dining',
  },
];

export const QA_CATEGORIES: QACategory[] = [
  'Access',
  'Opening',
  'Reservation',
  'Events',
  'Dining',
  'Services',
  'Requests',
];
