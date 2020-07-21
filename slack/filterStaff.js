

module.exports = (allUsers) => {
  let staff = []
  allUsers.forEach(user => {
    if(user.is_admin) {
      staff.push({ 
        staffId: user.id, 
        staffName: user.profile.real_name,
        staffEmail: user.profile.email
      });
    }
  });
  console.log(staff);
  return staff;
}