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
    href: "/schedule",
  },
  {
    title: "Information",
    href: "/information",
  },
];

export function Navigation() {
  return (
    <header className="container mx-auto px-4 py-4 flex items-center justify-center">
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
