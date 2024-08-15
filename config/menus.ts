import {
  DashBoard,
  Settings,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Settings",
      icon: Settings,
      child: [
        {
          title: "Global Setting",
          href: "/setting/global-setting",
          icon: Settings,
        },
      ],
    },
    {
      title: "Masters",
      icon: Settings,
      child: [
        {
          title: "Industry",
          href: "/industry",
          icon: Settings,
        },
        {
          title: "Category",
          href: "/category",
          icon: Settings,
        },
        {
          title: "Brand",
          href: "/brand",
          icon: Settings,
        },
        {
          title: "Attribute",
          href: "/attribute",
          icon: Settings,
        },
        {
          title: "Attribute Value",
          href: "/attribute-value",
          icon: Settings,
        },
        {
          title: "Country",
          href: "/country",
          icon: Settings,
        },
        {
          title: "State",
          href: "/state",
          icon: Settings,
        },
        {
          title: "City",
          href: "/city",
          icon: Settings,
        },
        {
          title: "Testimonial",
          href: "/testimonial",
          icon: Settings,
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        child: [
          {
            title: "Global Setting",
            href: "/setting/global-setting",
            icon: Settings,
          },
        ],
      },
      {
        title: "Masters",
        icon: Settings,
        child: [
          {
            title: "Industry",
            href: "/industry",
            icon: Settings,
          },
          {
            title: "Category",
            href: "/category",
            icon: Settings,
          },
          {
            title: "Brand",
            href: "/brand",
            icon: Settings,
          },
          {
            title: "Attribute",
            href: "/attribute",
            icon: Settings,
          },
          {
            title: "Attribute Value",
            href: "/attribute-value",
            icon: Settings,
          },
          {
            title: "Country",
            href: "/country",
            icon: Settings,
          },
          {
            title: "State",
            href: "/state",
            icon: Settings,
          },
          {
            title: "City",
            href: "/city",
            icon: Settings,
          },
          {
            title: "Testimonial",
            href: "/testimonial",
            icon: Settings,
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        child: [
          {
            title: "Global Setting",
            href: "/setting/global-setting",
            icon: Settings,
          },
        ],
      },
      {
        title: "Masters",
        icon: Settings,
        child: [
          {
            title: "Industry",
            href: "/industry",
            icon: Settings,
          },
          {
            title: "Category",
            href: "/category",
            icon: Settings,
          },
          {
            title: "Brand",
            href: "/brand",
            icon: Settings,
          },
          {
            title: "Attribute",
            href: "/attribute",
            icon: Settings,
          },
          {
            title: "Attribute Value",
            href: "/attribute-value",
            icon: Settings,
          },
          {
            title: "Country",
            href: "/country",
            icon: Settings,
          },
          {
            title: "State",
            href: "/state",
            icon: Settings,
          },
          {
            title: "City",
            href: "/city",
            icon: Settings,
          },
          {
            title: "Testimonial",
            href: "/testimonial",
            icon: Settings,
          },
        ],
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
