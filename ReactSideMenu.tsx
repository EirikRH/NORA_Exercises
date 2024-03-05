import React, { ReactElement, useState } from "react";

type MenuItem = {
  title: string;
  subItems?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

function Solution({ menuConfig }: { menuConfig: MenuConfig }): ReactElement {
  const [displayed, setDisplayed] = useState("");
  /* Ta imot data
For hvert element i data, lag en div med tittel som tekst.
Hvis elementet har subItems, lag en button'Expand' som kan toggle visning av subItems.
Hvis man trykker på en "expand", fjern visning av subItems i andre menyer */

  function handleButtonClick(title: string): void {
    if (displayed === title) {
      setDisplayed("");
    } else {
      setDisplayed(title);
    }
  }

  const menus = menuConfig.map((menu, i) => {
    const title = menu.title;
    const subItems =
      menu.subItems &&
      menu.subItems.map((subItem, i) => {
        return (
          <li
            key={i}
            data-test-id={`li-${title.toLowerCase()}-${subItem.toLowerCase()}`}
          >
            {subItem}
          </li>
        );
      });
    return (
      <div data-test-id={`first-level-${menu.title.toLowerCase()}`} key={i}>
        {menu.title}
        {menu.subItems ? (
          <button
            data-test-id={`button-${menu.title.toLowerCase()}`}
            key={i}
            onClick={() => handleButtonClick(menu.title)}
          >
            {displayed === menu.title ? "Hide" : "Expand"}
          </button>
        ) : null}
        {displayed === menu.title ? (
          <ul data-test-id={`ul-${menu.title}`}>{subItems}</ul>
        ) : null}
      </div>
    );
  });

  return <div className="menu-wrapper">{menus}</div>;
}

export default Solution;
