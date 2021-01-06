const calculateDistance = require('../../helpers/calculateDistance');

describe('calculateDistance', () => {
    it('should return 0 distance for same position', () => {
        expect(calculateDistance(20, 20, 20, 20, "K")).toEqual(0);
    });

    it('should return x distance for different position', () => {
        expect(calculateDistance(20, 20, 30, 30, "K")).toEqual(1499.0);
    })
});

