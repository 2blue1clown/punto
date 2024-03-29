export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-full mt-3">{children}</div>;
}

export const metadata = {
  title: "Punto Online",
  description: "Join a room to play Punto Online with friends.",
};
