export default () => ({
  berriesService: {
    getBerry: process.env.GET_BERRY,
    getBerryFirmnesses: process.env.GET_BERRY_FIRMNESSES,
    getBerryFlavors: process.env.GET_BERRY_FLAVORS,
  },
  contestService: {
    getContest: process.env.GET_CONTEST_TYPE,
    getContestEffect: process.env.GET_CONTEST_EFFECTS,
    getSuperContestEffect: process.env.GET_SUPER_CONTEST_EFFECTS,
  },
});
