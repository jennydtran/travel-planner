import React from 'react';
import parseRoute from '../lib/parse-route';

export function HomeIcon(props) {
  return (
    <svg className="icon" data-name="Livello 1" id="Livello_1" width="2rem" height="2rem" fill="000000" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path d="M127.12,60.22,115.46,48.56h0L69,2.05a7,7,0,0,0-9.9,0L12.57,48.53h0L.88,60.22a3,3,0,0,0,4.24,4.24l6.57-6.57V121a7,7,0,0,0,7,7H46a7,7,0,0,0,7-7V81a1,1,0,0,1,1-1H74a1,1,0,0,1,1,1v40a7,7,0,0,0,7,7h27.34a7,7,0,0,0,7-7V57.92l6.54,6.54a3,3,0,0,0,4.24-4.24ZM110.34,121a1,1,0,0,1-1,1H82a1,1,0,0,1-1-1V81a7,7,0,0,0-7-7H54a7,7,0,0,0-7,7v40a1,1,0,0,1-1,1H18.69a1,1,0,0,1-1-1V51.9L63.29,6.29a1,1,0,0,1,1.41,0l45.63,45.63Z" />
    </svg>
  );
}

export function ThreeDotNavIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="000000" className="icon bi bi-three-dots-vertical" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
}

export function TripEditIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="#FFAD0F" className="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    </svg>
  );
}

export function DashDeleteIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="#dbdbdb" className="icon bi bi-dash" viewBox="0 0 16 16">
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
    </svg>
  );
}

export function PlusIcon(props) {
  let fillColor;
  let size;
  if (parseRoute(window.location.hash).path === 'travelers') {
    fillColor = '#ffad0f';
    size = '2.75rem';
  } else {
    fillColor = '#000000';
    size = '2rem';
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={fillColor} className="bi bi-plus" viewBox="0 0 16 16">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  );
}

export function BackLeftIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="#000000" className="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </svg>
  );
}

export function CameraIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2.25rem" height="2.25rem" fill="#ffffff" className="icon bi bi-camera-fill" viewBox="0 0 16 16">
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
    </svg>
  );
}

export function ChecklistIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="3.25rem" height="3.25rem" fill="#000" className="bi bi-list-check" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
    </svg>
  );
}

export function TravelerIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="#000" viewBox="0 0 512 512">
      <g>
        <circle className="st0" cx="259.7" cy="68.1" r="45.6" />
        <path className="st0" d="M194,195.8c-7-7.6-11-17.7-10.9-28.2c0-1.5,0.1-3,0.3-4.4h-30.3v142.3h45.6L194,195.8z" />
        <polygon className="st0" points="211.7,329.9 197.1,489.5 231.8,489.5 265.1,351.2 263.2,350.4  " />
        <path className="st0" d="M236.6,144c-4.1-2.1-8.3-3.1-12.5-3.1c-8.5,0-16.6,4.1-21.6,10.8c-0.6,0.8-1.1,1.6-1.6,2.4   c-1.6,2.7-2.8,5.7-3.3,9c-0.3,1.5-0.4,3-0.4,4.6c-0.1,8.6,4,16.6,10.6,21.7c1.6,1.2,3.4,2.3,5.4,3.2l39.4,15.5l32.3,12.7l26,10.2   l83.9-56.5l-13.8-22.6l-75.6,33.3L236.6,144z" />
        <polygon className="st0" points="283.9,235.5 247.4,221.1 208.4,205.8 212.7,305.5 213.1,315.4 268.4,337.4 276,340.5 321.1,358.5    332.6,489.5 367,489.5 380.9,328.6 281.5,274.4  " />
        <rect className="st0" height="91.6" width="21.8" x="117.3" y="214" />
        <path className="st0" d="M187.6,149.2c0.4-0.8,0.8-1.5,1.3-2.3l0.4-0.7l0.5-0.6c0.2-0.3,0.4-0.6,0.6-0.9l0.4-0.7l0.5-0.7   c3.8-5,8.7-9.1,14.2-11.9c-2.9-11.8-13.5-20.5-26.2-20.5c-14.9,0-27,12.1-27,27c0,4,0.9,7.9,2.5,11.3H187.6z" />
      </g>
    </svg>
  );
}

export function AirplaneIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="#eee" viewBox="0 0 30 30"><path d="M26,17H2v-4h24c1.105,0,2,0.895,2,2v0C28,16.105,27.105,17,26,17z" /><polygon points="6,14 2,14 2,9 3,9 " /><polygon points="19,14 12,14 9,3 11,3 " /><polygon points="6,16 2,16 2,21 3,21 " /><polygon points="19,16 12,16 9,27 11,27" /></svg>
  );
}

export function MapIcon(props) {
  return (
    <svg width="4rem" height="4rem" fill="#eee" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g><path d="M462.4267,175.8809a120.5879,120.5879,0,0,1-6.6751,11.3647l-56.833,79.5718a51.3893,51.3893,0,0,1-41.748,21.477,50.7351,50.7351,0,0,1-14.8519-2.4747V450.3488l98.7643,31.0257a16.8769,16.8769,0,0,0,4.917.7236A17.0929,17.0929,0,0,0,463.0981,465V180A16.8392,16.8392,0,0,0,462.4267,175.8809Z" /><path d="M239.9919,147.6777l-35.9265,9.89V478.0208L308.119,449.3816V256.5845l-49.5271-69.33A121.5093,121.5093,0,0,1,239.9919,147.6777Z" /><path d="M55.7949,128.2788A17.0879,17.0879,0,0,0,48.9019,142V427A17.09,17.09,0,0,0,61.083,443.3745L169.8645,477.543V156.7092L70.917,125.6255A17.0653,17.0653,0,0,0,55.7949,128.2788Z" /><path d="M343.25,246.936a17.1006,17.1006,0,0,0,27.8321,0l56.833-79.5625a86.9389,86.9389,0,1,0-141.4981,0ZM357.166,88.3445a28.5,28.5,0,1,1-28.5,28.5A28.4992,28.4992,0,0,1,357.166,88.3445Z" /></g></svg>
  );
}

export function PackingIcon(props) {
  return (
    <svg viewBox="0 0 512 512" width="4rem" height="4rem" fill="#eee" xmlns="http://www.w3.org/2000/svg"><title /><g id="Suitcase"><path d="M465,120.1519H406.0981V458.3481H465A17.0965,17.0965,0,0,0,482.0981,441.25v-304A17.0965,17.0965,0,0,0,465,120.1519Z" /><path d="M330.0981,70.75A17.0965,17.0965,0,0,0,313,53.6519H199A17.0965,17.0965,0,0,0,181.9019,70.75v49.4019H140.0981V458.3481H371.9019V120.1519H330.0981Zm-114,17.0981h79.8038v32.3038H216.0981ZM273.8171,393.75,170.4988,345.5728l28.1034-60.27L301.9217,333.48ZM331.9988,227.5a33.25,33.25,0,1,1-33.25-33.25A33.2494,33.2494,0,0,1,331.9988,227.5Z" /><path d="M29.9019,137.25v304A17.0965,17.0965,0,0,0,47,458.3481h58.9019V120.1519H47A17.0965,17.0965,0,0,0,29.9019,137.25Z" /></g></svg>
  );
}

export function ActivitiesIcon(props) {
  return (
    <svg width="4rem" height="4rem" fill="#eee" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g><path d="M26,19c-1.2,0-2.3,0.3-3.3,1h-4.4c-1-0.7-2.1-1-3.3-1c-3.3,0-6,2.7-6,6s2.7,6,6,6c1.2,0,2.3-0.3,3.3-1h4.4   c1,0.7,2.1,1,3.3,1c3.3,0,6-2.7,6-6S29.3,19,26,19z M17,26h-1v1c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1v-1   c0-0.6,0.4-1,1-1s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1S17.6,26,17,26z M25.9,26.4c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.2   S25.1,27,25,27c-0.1,0-0.3,0-0.4-0.1c-0.1,0-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3C24,26.3,24,26.1,24,26s0-0.3,0.1-0.4   c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2c0.4-0.2,0.8-0.1,1.1,0.2c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0.1,0.3,0.1,0.4   S26,26.3,25.9,26.4z M27.9,24.4c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.2S27.1,25,27,25c-0.1,0-0.3,0-0.4-0.1   c-0.1,0-0.2-0.1-0.3-0.2C26.1,24.5,26,24.3,26,24c0-0.3,0.1-0.5,0.3-0.7c0,0,0.1-0.1,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1   c0.1,0,0.1,0,0.2-0.1c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0.1c0,0,0.1,0.1,0.1,0.1c0.2,0.2,0.3,0.5,0.3,0.7   C28,24.1,28,24.3,27.9,24.4z" /><path d="M13.5,17.2c0.1-0.5,0.1-1,0-1.5c-0.2-1.2-1.1-2.1-2.2-2.5c-0.6-0.2-1.3-0.4-2.1-0.5c-2.4-0.5-5.1-1.1-6.1-3.2   C2.7,8.7,2.5,8,2.3,7.3C0.9,9.5,0,12.2,0,15c0,5.2,2.9,9.8,7.1,12.2c0-0.2,0.1-0.3,0.1-0.5C7.1,26.1,7,25.6,7,25   C7,21.1,9.8,17.9,13.5,17.2z" /><path d="M9.6,10.7c0.8,0.2,1.6,0.4,2.3,0.6c1.8,0.6,3.2,2.1,3.5,4c0.1,0.6,0.1,1.2,0,1.8c1.2,0.1,2.3,0.4,3.3,1h2.9   c1-0.7,1.8-1.6,2.4-2.6c1.4-2.1,1.7-6,1.8-7.7C23.5,3.7,19.1,1,14,1C10.1,1,6.6,2.6,4,5.2c0,0.5,0.2,1.9,0.9,3.3   C5.5,9.8,7.7,10.2,9.6,10.7z" /><path d="M25.5,17c0.2,0,0.3,0,0.5,0c0.6,0,1.2,0.1,1.8,0.2c0.1-0.7,0.2-1.5,0.2-2.2c0-1.2-0.2-2.3-0.4-3.4   c-0.3,1.7-0.8,3.6-1.7,4.9C25.7,16.7,25.6,16.9,25.5,17z" /></g></svg>
  );
}

export function AccommodationIcon(props) {
  return (
    <svg width="4rem" height="4rem" fill="#eee" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" >
      <g id="Layer_1" /><g id="Layer_2"><g><g><circle className="st0" cx="158.25" cy="211.89" r="50.04" /></g>
      <g><path className="st0" d="M468.5,289.51v150.3H431l-0.72-3.53c-8.19-39.96-43.35-68.65-84.14-68.65H165.86     c-40.79,0-75.95,28.69-84.14,68.65L81,439.81H43.5V88.19c0-8.84,7.16-16,16-16s16,7.16,16,16v201.32h158.69V175.99     c0-32.29,31.23-55.38,62.1-45.91l135.21,41.47c19.46,5.96,33.05,23.56,33.9,43.89L468.5,289.51z" />
      </g></g></g>
    </svg>
  );
}

export function ChevronUp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="000000" className="bi bi-chevron-compact-up" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
    </svg>
  );
}

export function Checkbox(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="#dddddd" className="bi bi-app" viewBox="0 0 16 16">
      <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z" />
    </svg>
  );
}

export function Checkmark(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="#40B4A6" className="bi bi-check2" viewBox="0 0 16 16">
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
    </svg>
  );
}

export function EditPencil(props) {
  return (
    <svg viewBox="0 0 32 32 " width="1.5rem" height="1.5rem" fill="#ffad0f" xmlns="http://www.w3.org/2000/svg">
      <g data-name="Layer 18" id="Layer_18">
        <path className="cls-1" d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Zm8.17-1.91h0ZM3.86,22.28l-.73,6.59,6.59-.73L28.54,9.31a1.58,1.58,0,0,0,0-2.22L24.91,3.46a1.58,1.58,0,0,0-2.22,0Z" />
        <path className="cls-1" d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z" />
        <rect className="cls-1" height="2" transform="translate(-7.91 15.47) rotate(-45)" width="12.84" x="8.29" y="16.28" />
      </g>
    </svg>
  );
}

export function CircleInactive(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.7rem" height="0.7rem" fill="rgba(145, 228, 218, 0.4)" className="bi bi-circle-fill" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" />
    </svg>
  );
}

export function CircleActive(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.7rem" height="0.7rem" fill="#34a598" className="bi bi-circle-fill" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" />
    </svg>
  );
}

export function EyeClosed(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="#aaa" className="bi bi-eye-slash mt-1" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
    </svg>
  );
}

export function EyeOpen(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="#aaa" className="bi bi-eye mt-1" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
  );
}

export function SignOut(props) {
  return (
    <svg height="1.9rem" viewBox="0 0 24 24" width="1.9rem" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
      <polyline fill="none" points="17 16 21 12 17 8" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
      <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

export function XIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="red" className="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  );
}

export function Question(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="#ffad0f" className="bi bi-question" viewBox="0 0 16 16">
      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
    </svg>
  );
}
