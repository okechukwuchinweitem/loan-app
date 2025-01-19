class User {
    static userCount = 0;
    static users = [];

    constructor(userId, username, password) {
        this.userId = userId;
        this.username = username;
        this.userpassword = password;
        this.balance = 0;
        this.loanHistory = [];
        User.users.push(this);
    }

    static login(username, password) {
        const user = User.users.find(user => user.username === username && user.userpassword === password);
        if (user) {
            console.log("Login successful");
            User.userCount++;
            return user;
        } else {
            console.log("Login failed");
            return null;
        }
    }

    static getUserCount() {
        console.log(`There are ${User.userCount} users online`);
    }

    sayHello() {
        console.log(`Hello, ${this.username}, Welcome to the best Loan app for small business growth, Our interest rate is just 5%`);
    }

    viewBalance() {
        console.log(`Your current balance is ${this.balance}`);
    }

    viewLoanHistory() {
        console.log("Loan History:", this.loanHistory);
    }
}

class Loan {
    static totalAmount = 1000;
    static availableAmount = 900;
    static interestRate = 0.05;

    constructor(loanId, loanAmount, loanInterest, loanDuration) {
        this.loanId = loanId;
        this.loanAmount = loanAmount;
        this.loanInterest = loanInterest;
        this.loanDuration = loanDuration;
    }

    static getAvailableAmount() {
        console.log(`The available amount is ${Loan.availableAmount}`);
        if (Loan.availableAmount > 0) {
            console.log("You can apply for a loan");
        } else {
            console.log("You cannot apply for a loan");
        }
    }

    // To take a loan

    static takeLoan(user, loanAmount) {
        if (Loan.availableAmount >= loanAmount) {
            const loanInterest = loanAmount * Loan.interestRate;
            const loan = new Loan(Date.now(), loanAmount, loanInterest, 12); // For 12 months duration
            user.balance += loanAmount;
            user.loanHistory.push(loan);
            Loan.availableAmount -= loanAmount;
            console.log(`Loan of ${loanAmount} taken successfully. Interest: ${loanInterest}`);
        } else {
            console.log("Insufficient funds available for loan");
        }
    }

    // To pay back a Loan

    static payBackLoan(user, loanId) {
        const loanIndex = user.loanHistory.findIndex(loan => loan.loanId === loanId);

        if (loanIndex !== -1) {
            const loan = user.loanHistory[loanIndex];
            const totalPayback = loan.loanAmount + loan.loanInterest;

            if (user.balance >= totalPayback) {
                user.balance -= totalPayback;
                Loan.availableAmount += loan.loanAmount;
                user.loanHistory.splice(loanIndex, 1);
                console.log(`Loan of ${loan.loanAmount} paid back successfully. Total payback: ${totalPayback}`);
            } else {
                console.log("Insufficient balance to pay back the loan");
            }
        } else {
            console.log("Loan not found");
        }
    }
}

const user1 = new User(1, "Ferdinand", "pass123");
const user2 = new User(2, "Okechukwu", "FE123");

User.login("Ferdinand", "pass123");
user1.sayHello();
user1.viewBalance();
Loan.getAvailableAmount();
Loan.takeLoan(user1, 500);
user1.viewBalance();
user1.viewLoanHistory();
Loan.payBackLoan(user1, user1.loanHistory[0].loanId);
user1.viewBalance();
user1.viewLoanHistory();
User.getUserCount();