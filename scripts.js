function selectSection(id) {
  d3.selectAll('body>section').style('display', 'none');
  d3.select(id).style('display', 'block');
  window.scrollTo(0,0);
}

function showInfo(data, tabletop) {

  let lecture = d3.select('#lectures-list').selectAll('.lecture').data(data.lectures.elements, function(d) {
    return d['lecture #']
  })
  lecture.exit();
  lecture = lecture.enter().append('li')
    .classed('lecture', true)
    .html(function(d) {
      let topicsList = '<ul class="topics-list">'
      let topics = ``;
      d.topics.split(';').forEach(function(e) {
        topics += `<li>${e}</li>`;
      })
      topicsList += topics
      topicsList += '</ul>'
      let finalHtml = `<a target="_blank" href ="">${d['lecture #']}. ${d.title}</a><p>${d.subtitle}</p>` + topicsList;
      return finalHtml
    })
    .merge(lecture)
    .on('click', function(d){
      if (d.link) {
        window.open(d.link);
      }

    })

  let studentAssignment;

  let assignment = d3.select('#assignments-list').selectAll('.assignment').data(data.assignments.elements.columns.slice(3, data.assignments.elements.columns.length))
  assignment.exit();
  assignment = assignment.enter().append('li')
    .classed('assignment', true)
    .merge(assignment)
    .append('div')
    .append('p')
    .datum(function(d) {
      return d
    })
    .html(function(d) {
      return d;
    })
    .on('click', function(d) {

      if (d3.select(this).classed("opened")) {
        d3.selectAll('.assignment>div>p:not(this)').classed('opened', false)
        d3.selectAll('.student-assignment').remove();
      } else {
        d3.selectAll('.assignment>div>p:not(this)').classed('opened', false)
        d3.selectAll('.student-assignment').remove();

        d3.select(this).classed("opened", !d3.select(this).classed("opened"))

        let box = d3.select(this.parentNode);
        let thisData = data.assignments.elements.filter(function(e) {
          return e[d]
        })

        studentAssignment = box.selectAll('.student-assignment').data(thisData, function(e) {
          return e.github_username + '-' + e[d];
        })

        studentAssignment.exit().remove();

        studentAssignment = studentAssignment.enter().append('div')
          .classed('student-assignment', true)
          .merge(studentAssignment)

        let single = studentAssignment.append('div').style('display', 'none').style('opacity', 0)

        single.append('a')
          .attr('class', 'assignment-picture')
          .attr('target', '_blank')
          .attr('href', function(e) {
            let repo = e[d].split('/')
            repo = repo[repo.length-1]
            e.repo = repo
            return `https://drawwithcode.github.io/${repo}`;
          })
          .style('background-image', function(e) {
            return `url("https://raw.githubusercontent.com/drawwithcode/${e.repo}/master/cover.png"),url("https://via.placeholder.com/150x150/18FF68/000?text=no+image")`;
          })
        single.append('p').classed('student-name', true).html(function(e) {
          // console.log(e)
          return `${e['surname-name'].replace(/ /g, "<br/>")} <a style="color:var(--orange);" target="_blank" href="https://github.com/drawwithcode/${e[d]}"> <&sol;> </a>`
        })

        single.transition()
          .duration(500)
          .delay(function(e, i) {
            return i * 10
          })
          .style('opacity', 1)
          .style('display', 'block')
      }

    })

  let project = d3.select('#projects-list').selectAll('.project').data(data["team projects"].elements, function(d){ return d.id })
  project.exit().remove();
  project = project.enter().append('li')
    .classed('project', true)
    .merge(project)

  project.append('h3').text(function(d){ return d.title })

  project.append('div').classed('project-image', true).style('background-image', function(d){
    let linkParts = d.repository_link.split('/')
    let username = linkParts[ (linkParts.indexOf('github.com')+1) ];
    let reponame = linkParts[ (linkParts.indexOf('github.com')+2) ];
    return `url("https://raw.githubusercontent.com/${username}/${reponame}/master/cover.png")`;
  })

  project.append('p').classed('text-left', true).text(function(d){ return d.description })

  project.append('p')
    .classed('text-right', true)
    .classed('go-to-website', true)
    .append('a')
      .attr('href',function(d){
        return d.repository_link
      })
      .attr('target','_blank')
      .text('» go to website »')




}

function init() {

  Promise.all([
    d3.tsv('./assets/Creative Coding 1819 Calendar, deliverableas, team projects - lectures.tsv'),
    d3.tsv('./assets/Creative Coding 1819 Calendar, deliverableas, team projects - assignments.tsv'),
    d3.tsv('./assets/Creative Coding 1819 Calendar, deliverableas, team projects - team projects.tsv')
  ])
  .then(([lectures, assignments, teamProjects]) =>  {
    // Do your stuff. Content of both files is now available in stations and svg
    const data = {
      "lectures": {
        "elements": lectures
      },
      "assignments": {
        "elements": assignments
      },
      "team projects": {
        "elements": teamProjects
      }
    }
    showInfo(data)
  });

}


selectSection('#home')

window.addEventListener('DOMContentLoaded', init)
