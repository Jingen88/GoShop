const navLinks = [
 {
	id: "home",
	title: "Home",
 },
 {
	id: "filler",
	title: "About Us",
 },
 {
	id: "shop",
	title: "Scoop Shop",
 },
 {
	id: "contact",
	title: "Contact",
 },
];
 export default navLinks


const storeInfo = {
 heading: "Where to Find Us",
 address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
 contact: {
	phone: "(555) 987-6543",
	email: "hello@jsmcocktail.com",
 },
};

const openingHours = [
 { day: "Mon–Thu", time: "11:00am – 12am" },
 { day: "Fri", time: "11:00am – 2am" },
 { day: "Sat", time: "9:00am – 2am" },
 { day: "Sun", time: "9:00am – 1am" },
];

const socials = [
 {
	name: "Instagram",
	icon: "/images/insta.png",
	url: "#",
 },
 {
	name: "X (Twitter)",
	icon: "/images/x.png",
	url: "#",
 },
 {
	name: "Facebook",
	icon: "/images/fb.png",
	url: "#",
 },
];

const sliderLists = [
  {
    id: 1,
    name: "Classic Virgin Mojito",
    image: "/images/drink1.png",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "A refreshing blend of muddled mint, fresh lime juice, and a touch of sweetness, topped with sparkling soda water. All the flavor of the classic, just without the rum.",
  },
  {
    id: 2,
    name: "Raspberry Nojito",
    image: "/images/drink2.png",
    title: "A Zesty Classic That Never Fails",
    description:
      "This vibrant mocktail balances sweet raspberries with tangy lime and fresh mint, creating a crisp and refreshing drink that's perfect for any occasion.",
  },
  {
    id: 3,
    name: "Enchanted Garden",
    image: "/images/drink3.png",
    title: "A Floral-Infused Delight",
    description:
      "A magical mix of elderflower cordial, a hint of lavender, and fresh lemon juice, topped with lemonade for a sparkling, non-alcoholic botanical treat.",
  },
  {
    id: 4,
    name: "Blue Lagoon Sparkler",
    image: "/images/drink4.png",
    title: "Crafted With Care, Poured With Love",
    description:
      "A dazzling non-alcoholic drink made with blue curaçao syrup, fresh pineapple juice, and a squeeze of lime, topped with soda for a brilliant, bubbly finish.",
  },
];

export {
 openingHours,
 storeInfo,
 socials,
 sliderLists,
};