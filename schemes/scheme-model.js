const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first()
}

function findSteps(id) {
    return db('steps')
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .where({scheme_id: id})
        .orderBy('steps.step_number')
}
/*
SELECT steps.id,schemes.scheme_name, steps.step_number, steps.instructions FROM steps
JOIN schemes ON steps.scheme_id = schemes.id
WHERE steps.scheme_id = 5
ORDER BY steps.step_number
*/

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(ids => {
            const [id] = ids

            return findById(id)
        })
}

function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
        .then(res => {
            return findById(id)
        })
}

function remove(id) {
    return db('schemes')
        .where({id})
        .del()
}

function addStep(step, scheme_id) {
    return db('steps')
        .where({scheme_id})
        .insert(step, 'id')
}

// addStep(step, scheme_id): This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.