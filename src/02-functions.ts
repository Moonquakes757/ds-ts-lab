import { Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend): string {
    f.age += 1
    return `${f.name} is now ${f.age}`
}

function allOlder(friendsArray: Friend[]): string[] {
    return friendsArray.map(friend => older(friend));
}

console.log(allOlder(friends));

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]): Colleague {
    const result = cs.sort(
        (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
}

function addColleague(cs: Colleague[], name: string, department: string, email: string): void {
    const highest = highestExtension(cs);
    const newExtension = highest.contact.extension + 1;

    const newColleague: Colleague = {
        name,
        department,
        contact: {
            email,
            extension: newExtension
        }
    };

    cs.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
  ): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
     end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
  }
  // Test invocations
  console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
  

function findFriends(friendsArray: Friend[], criterion: (friend: Friend) => boolean): string[] {
    return friendsArray
        .filter(criterion)
        .map(friend => friend.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));


function addInterest(friend: Friend, interest: string): string[] {
    // If 'interests' is undefined, initialize it as an empty array
    if (!friend.interests) {
        friend.interests = [];
    }

    // Add the new interest
    friend.interests.push(interest);

    // Return the updated interests array
    return friend.interests;
}

// Test addInterest
console.log(addInterest(friends[0], 'Politics')); // Example: [ 'Music', 'Sport', 'Politics' ]
console.log(addInterest(friends[1], 'Cooking'));  // Example: [ 'Cooking' ]

