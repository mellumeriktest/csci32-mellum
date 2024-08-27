import Image from 'next/image'

export default function Home() {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/RySHDUU2juM?si=Ux2q1ioaFEz7y_k1"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      allowFullScreen
    ></iframe>
  )
}
