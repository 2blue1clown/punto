


export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full flex flex-col sm:items-center p-1">
    <div className="xmd:w-2/3 lg:w-1/2 flex flex-col items-center gap-3 sm:text-center">
      {children}
    </div>
    </div>
}

export const metadata = {
  title: "Punto Online - About",
  description: "Learn about Punto and the it's development process.",
};
