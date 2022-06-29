import { fetchData } from './public/js/main';

test('should check to display first name and last name', () => {
  fetchData('/players', (data) => {
    playerData = data;
    playerData.forEach((data) => {
      const {
        player: {
          name: { first: firstName, last: lastName },
        },
      } = data;
      const footBallPlayerNames = [
        'Toby Alderweireld',
        'Yaya Touré',
        'Wayne Rooney',
        'Per Mertesacker',
        'Riyad Mahrez',
      ].includes(`${firstName} ${lastName}`);
      expect(footBallPlayerNames).toBe(true);
    });
  });
});
