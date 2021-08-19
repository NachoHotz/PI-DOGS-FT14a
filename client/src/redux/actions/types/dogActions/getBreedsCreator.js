/* eslint-disable import/prefer-default-export */

export function getBreedsCreator(creator) {
  if (creator === 'all') return { type: 'all' };
  if (creator === 'created') return { type: 'created' };
  if (creator === 'notcreated') return { type: 'notcreated' };
}
