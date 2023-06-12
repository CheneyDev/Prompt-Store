import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">
            <Sparkles size={20} />
            Prompt Store
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
            <div className="form-control">
              <input
                type="text"
                placeholder="搜索商品"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end ml-3">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// import { Globe, Mic } from "lucide-react";

// import {
//   Menubar,
//   MenubarCheckboxItem,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
// } from "@/components/ui/menubar";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export function Menu() {
//   return (
//     <>
//       <div className="flex justify-between items-center h-[45px]">
//         <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
//           <MenubarMenu>
//             <MenubarTrigger className="font-bold">Music</MenubarTrigger>
//             <MenubarContent>
//               <MenubarItem>About Music</MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>
//                 Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>
//                 Hide Music... <MenubarShortcut>⌘H</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem>
//                 Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
//               </MenubarItem>
//               <MenubarShortcut />
//               <MenubarItem>
//                 Quit Music <MenubarShortcut>⌘Q</MenubarShortcut>
//               </MenubarItem>
//             </MenubarContent>
//           </MenubarMenu>
//           <MenubarMenu>
//             <MenubarTrigger className="relative">File</MenubarTrigger>
//             <MenubarContent>
//               <MenubarSub>
//                 <MenubarSubTrigger>New</MenubarSubTrigger>
//                 <MenubarSubContent className="w-[230px]">
//                   <MenubarItem>
//                     Playlist <MenubarShortcut>⌘N</MenubarShortcut>
//                   </MenubarItem>
//                   <MenubarItem disabled>
//                     Playlist from Selection{" "}
//                     <MenubarShortcut>⇧⌘N</MenubarShortcut>
//                   </MenubarItem>
//                   <MenubarItem>
//                     Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
//                   </MenubarItem>
//                   <MenubarItem>Playlist Folder</MenubarItem>
//                   <MenubarItem disabled>Genius Playlist</MenubarItem>
//                 </MenubarSubContent>
//               </MenubarSub>
//               <MenubarItem>
//                 Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem>
//                 Close Window <MenubarShortcut>⌘W</MenubarShortcut>
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarSub>
//                 <MenubarSubTrigger>Library</MenubarSubTrigger>
//                 <MenubarSubContent>
//                   <MenubarItem>Update Cloud Library</MenubarItem>
//                   <MenubarItem>Update Genius</MenubarItem>
//                   <MenubarSeparator />
//                   <MenubarItem>Organize Library...</MenubarItem>
//                   <MenubarItem>Export Library...</MenubarItem>
//                   <MenubarSeparator />
//                   <MenubarItem>Import Playlist...</MenubarItem>
//                   <MenubarItem disabled>Export Playlist...</MenubarItem>
//                   <MenubarItem>Show Duplicate Items</MenubarItem>
//                   <MenubarSeparator />
//                   <MenubarItem>Get Album Artwork</MenubarItem>
//                   <MenubarItem disabled>Get Track Names</MenubarItem>
//                 </MenubarSubContent>
//               </MenubarSub>
//               <MenubarItem>
//                 Import... <MenubarShortcut>⌘O</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>
//                 Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
//               </MenubarItem>
//               <MenubarItem>Convert</MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>Page Setup...</MenubarItem>
//               <MenubarItem disabled>
//                 Print... <MenubarShortcut>⌘P</MenubarShortcut>
//               </MenubarItem>
//             </MenubarContent>
//           </MenubarMenu>
//           <MenubarMenu>
//             <MenubarTrigger>Edit</MenubarTrigger>
//             <MenubarContent>
//               <MenubarItem disabled>
//                 Undo <MenubarShortcut>⌘Z</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem disabled>
//                 Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem disabled>
//                 Cut <MenubarShortcut>⌘X</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem disabled>
//                 Copy <MenubarShortcut>⌘C</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem disabled>
//                 Paste <MenubarShortcut>⌘V</MenubarShortcut>
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>
//                 Select All <MenubarShortcut>⌘A</MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem disabled>
//                 Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>
//                 Smart Dictation...{" "}
//                 <MenubarShortcut>
//                   <Mic className="h-4 w-4" />
//                 </MenubarShortcut>
//               </MenubarItem>
//               <MenubarItem>
//                 Emoji & Symbols{" "}
//                 <MenubarShortcut>
//                   <Globe className="h-4 w-4" />
//                 </MenubarShortcut>
//               </MenubarItem>
//             </MenubarContent>
//           </MenubarMenu>
//           <MenubarMenu>
//             <MenubarTrigger>View</MenubarTrigger>
//             <MenubarContent>
//               <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
//               <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
//               <MenubarSeparator />
//               <MenubarItem inset disabled>
//                 Show Status Bar
//               </MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem inset>Hide Sidebar</MenubarItem>
//               <MenubarItem disabled inset>
//                 Enter Full Screen
//               </MenubarItem>
//             </MenubarContent>
//           </MenubarMenu>
//         </Menubar>

//         <div className="flex justify-end items-center px-6">
//           <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
//             <MenubarMenu>
//               <MenubarTrigger className="hidden md:block">
//                 <div className="flex items-center">
//               <Avatar className="mx-2 w-[25px] h-[25px]">
//                 <AvatarImage src="https://github.com/shadcn.png" />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//                 Username
//                 </div>
//               </MenubarTrigger>
//               <MenubarContent forceMount>
//                 <MenubarItem inset>我的信息</MenubarItem>
//                 <MenubarItem inset>修改密码</MenubarItem>
//                 <MenubarSeparator />
//                 <MenubarItem inset>退出登录</MenubarItem>
//               </MenubarContent>
//             </MenubarMenu>
//           </Menubar>
//         </div>
//       </div>
//     </>
//   );
// }
