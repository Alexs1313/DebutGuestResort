export type GuestTip = {
  id: string;
  icon: string;
  text: string;
};

export const GUEST_TIPS: GuestTip[] = [
  {id: 'tip-1', icon: '🪪', text: 'Keep your opening pass ready at the entrance and show it to staff when requested.'},
  {id: 'tip-2', icon: '⏰', text: 'Arrive earlier than planned for smooth pass verification and seating selection.'},
  {id: 'tip-3', icon: '📋', text: 'Check the opening plan before arrival so you know what events interest you.'},
  {id: 'tip-4', icon: '🎫', text: 'Reserve places for selected opening moments in advance from the Opening tab.'},
  {id: 'tip-5', icon: '📅', text: 'Review after-opening events in the calendar and save the ones you want to visit.'},
  {id: 'tip-6', icon: '🍽️', text: 'Prepare dining orders before busy evening hours to avoid longer wait times.'},
  {id: 'tip-7', icon: '🛎️', text: 'Use Services to send parking, lounge, dining table, or guest support requests.'},
  {id: 'tip-8', icon: '📄', text: 'Use Submitted Requests to review everything you already sent for venue review.'},
  {id: 'tip-9', icon: '🔋', text: 'Keep your phone charged during your visit for pass access and app use.'},
  {id: 'tip-10', icon: '🤝', text: 'Ask staff if your pass code cannot be verified or if you need venue guidance.'},
];
