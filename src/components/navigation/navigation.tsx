import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

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
];

export function Navigation() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-center">
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
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button asChild>
                <Link href="/rsvp">RSVP</Link>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
