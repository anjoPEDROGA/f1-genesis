export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
    },
  },
}

export const staggerContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}