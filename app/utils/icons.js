import React from 'react';
import { BiAdjust } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdKeyboardArrowRight, MdRefresh } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';
import { GoDotFill, GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';
import { MdKeyboardArrowUp } from 'react-icons/md';
import {
  FaArrowRight,
  FaInfo,
  FaRegStar,
  FaTachometerAlt,
} from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { GiGamepadCross, GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineSportsCricket } from 'react-icons/md';
import { IoFootballOutline } from 'react-icons/io5';
import { PiListBulletsFill, PiTennisBallLight } from 'react-icons/pi';
import { FiSearch } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

export const reactIcons = {
  doubleArrow: <AiOutlineDoubleLeft />,
  fillDropArrow: <TiArrowSortedDown />,
  fillUpArrow: <TiArrowSortedUp />,
  dropArrow: <IoMdArrowDropdown />,
  dummy: <BiAdjust />,
  refresh: <MdRefresh />,
  logout: <IoLogOutOutline />,
  login: <BiLogIn />,
  dot: <GoDotFill />,
  downArrow: <MdOutlineKeyboardArrowDown />,
  upArrow: <MdKeyboardArrowUp />,
  lightning: <BsLightningChargeFill />,
  star: <FaRegStar />,
  play: <FaCirclePlay />,
  casino: <GiGamepadCross />,
  cricket: <MdOutlineSportsCricket />,
  football: <IoFootballOutline />,
  tennis: <PiTennisBallLight />,
  search: <FiSearch />,
  setting: <IoMdSettings />,
  close: <IoClose />,
  watch: <MdOutlineAccessTime />,
  arrowleft: <BsChevronLeft />,
  arrowright: <BsChevronRight />,
  down: <GoTriangleDown />,
  up: <GoTriangleUp />,
  right: <MdKeyboardArrowRight />,
  meter: <FaTachometerAlt />,
  breakdown: <PiListBulletsFill />,
  arrowRight: <FaArrowRight />,
  infoh: <FaInfo />,
  hamburgerMenuIcon: <GiHamburgerMenu />,
  cross: <ImCross />,
};
