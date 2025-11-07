
export default function MainPage() {
  
  return (
    <div>
      <section
        className="h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${"/d/menjador12.jpg"})` }}
      >
        <h1 className="text-6xl font-bold drop-shadow-lg">Bienvenido</h1>
        <p className="text-xl mt-4 drop-shadow-md">Disfruta de de la mejor estancia con nosotros</p>
      </section>    
    </div>
  );
}
