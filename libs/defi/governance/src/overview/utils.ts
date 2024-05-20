export const parseProposalContent = (
  description: string | undefined | null,
) => {
  if (!description) {
    return { title: '', description: '' };
  }

  const split = description?.split(/\n/g);
  const title = split && split[0];
  const rest =
    split &&
    split
      .slice(1)
      .filter((d) => d)
      .join(`\n`);

  return { title, description: rest };
};
