function skillsMember() {
  var member = require('./member');
  var skills = require('./skills');
  var memberSkills = member.getSkills();
  var skillNames = memberSkills.map(function(skill) {
    return skill.name;
  });
  return skills.getSkillByName(skillNames);
}