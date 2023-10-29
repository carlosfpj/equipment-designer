import React from "react";
import Link from "next/link"

const Navbar = () => {
  return (
      <nav>
        <menu>
        <Link legacyBehavior href="/"><a>Home</a></Link>
        <Link legacyBehavior href="/about"><a>About</a></Link>
        </menu>
      </nav>
  );
}

export default Navbar;