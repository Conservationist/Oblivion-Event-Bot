export default function permCheck(m, role) {
  const roles = {
    user: ["(H) Pve Booster"],
    staff: ["Mods", "Saber Controller", "Admin"]
  };
  if (role === "staff") {
    if (m.author.id) {
      if (m.member.roles.some(r => roles.staff.includes(r.name))) {
        return true;
      } else {
        return false;
      }
    }
  } else if (role === "user") {
    if (m.author.id) {
      if (m.member.roles.some(r => roles.user.includes(r.name))) {
        return true;
      } else {
        return false;
      }
    }
  }
}
