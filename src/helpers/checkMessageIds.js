export default async function checkEventMessageIds(messageid) {
  const event = await Database.find({ Message_id: messageid });
  if (event.length < 1 || !event) return false;
  return true;
}
