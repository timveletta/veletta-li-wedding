import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Schedule",
    href: "/#schedule",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
  {
    title: "RSVP",
    href: "/rsvp",
  },
];

export function Navigation() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-center bg-primary">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map(({ title, href }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={href}>{title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
