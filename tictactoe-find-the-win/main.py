import tkinter as tk
from tkinter import messagebox
import random
side = 3
n_cell = side * side
n_state = 3 ** n_cell
types = {}
moves = {}
distance = {}
grid_buttons = []
starting_grids = []
grid = 0
player = 0
def get_id(i, j):
    return side * i + j
def get_cell_by_id(state, i):
    return state // (3 ** i) % 3
def set_cell_by_id(state, i, x):
    return state + 3 ** i * (x - get_cell_by_id(state, i))
def get_cell(state, i, j):
    return get_cell_by_id(state, get_id(i, j))
def set_cell(state, i, j, x):
    return set_cell_by_id(state, get_id(i, j), x)
def get_next_player(state):
    a = 0
    for i in range(n_cell):
        x = get_cell_by_id(state, i)
        if x == 1:
            a += 1
        elif x == 2:
            a -= 1
    return a + 1
def is_full(state):
    for i in range(n_cell):
        if get_cell_by_id(state, i) == 0:
            return False
    return True
def print_state(state):
    for i in range(side):
        for j in range(side):
            print(".XO"[get_cell(state, i, j)], end = "")
        print()
def get_winner(state):
    for i in range(side):
        x = get_cell(state, i, 0)
        if x != 0:
            ok = True
            for j in range(1, side):
                if get_cell(state, i, j) != x:
                    ok = False
            if ok:
                return x
    for j in range(side):
        x = get_cell(state, 0, j)
        if x != 0:
            ok = True
            for i in range(1, side):
                if get_cell(state, i, j) != x:
                    ok = False
            if ok:
                return x
    x = get_cell(state, 0, 0)
    if x != 0:
        ok = True
        for i in range(1, side):
            if get_cell(state, i, i) != x:
                ok = False
        if ok:
            return x
    x = get_cell(state, 0, side - 1)
    if x != 0:
        ok = True
        for i in range(1, side):
            if get_cell(state, i, side - i - 1) != x:
                ok = False
        if ok:
            return x
    return 0
def dfs(state):
    if state in types:
        return types[state]
    x = get_winner(state)
    if x != 0:
        types[state] = 2
        moves[state] = -1
        distance[state] = 0
        return types[state]
    if is_full(state):
        types[state] = 0
        moves[state] = -1
        distance[state] = 0
        return 0
    best_winning_state = -1
    best_drawing_state = -1
    best_losing_state = -1
    move_to_winning_state = -1
    move_to_drawing_state = -1
    move_to_losing_state = -1
    for i in range(n_cell):
        if get_cell_by_id(state, i) == 0:
            next_state = set_cell_by_id(state, i, get_next_player(state))
            next_state_type = dfs(next_state);
            if next_state_type == 0:
                if best_drawing_state == -1 or distance[best_drawing_state] > distance[next_state]:
                    best_drawing_state = next_state
                    move_to_drawing_state = i
            elif next_state_type == 1:
                if best_winning_state == -1 or distance[best_winning_state] < distance[next_state]:
                    best_winning_state = next_state
                    move_to_winning_state = i
            else:
                if best_losing_state == -1 or distance[best_losing_state] > distance[next_state]:
                    best_losing_state = next_state
                    move_to_losing_state = i
    if move_to_losing_state != -1:
        types[state] = 1
        moves[state] = move_to_losing_state
        distance[state] = distance[best_losing_state] + 1
    elif move_to_drawing_state != -1:
        types[state] = 0
        moves[state] = move_to_drawing_state
        distance[state] = distance[best_drawing_state] + 1
    else:
        types[state] = 2
        moves[state] = move_to_winning_state
        distance[state] = distance[best_winning_state] + 1
    return types[state]
def check_grid():
    winner = get_winner(grid)
    if winner != 0 or is_full(grid):
        disable_buttons()
        if winner != 0:
            messagebox.showinfo("", "You win!" if player == winner else "You lose!")
        else:
            messagebox.showinfo("", "Draw!")
        return True
    return False
def click(i, j):
    if get_cell(grid, i, j) != 0:
        return
    make_move(i, j)
    if not check_grid():
        make_move_by_id(moves[grid])
        check_grid()
def make_move(i, j):
    global grid
    grid = set_cell(grid, i, j, get_next_player(grid))
    grid_buttons[get_id(i, j)].config(text = "XO"[get_cell(grid, i, j) - 1])
def make_move_by_id(i):
    make_move(i // side, i % side)
def disable_buttons():
    for button in grid_buttons:
        button.config(state = tk.DISABLED)
def activate_buttons():
    for button in grid_buttons:
        button.config(state = tk.NORMAL)
def restart_game():
    global grid
    disable_buttons()
    grid = starting_grids[random.randint(0, len(starting_grids) - 1)]
    button1.config(text = "Play as X", state = tk.NORMAL, command = lambda: choose_X_or_O(1))
    button2.config(text = "XO"[get_next_player(grid) - 1] + " to move", state = tk.DISABLED)
    button3.config(text = "Play as O", state = tk.NORMAL, command = lambda: choose_X_or_O(2))
    for i in range(n_cell):
        grid_buttons[i].config(text = " XO"[get_cell_by_id(grid, i)])
def choose_X_or_O(X_or_O):
    global player
    player = X_or_O
    button1.config(text = "", state = tk.DISABLED)
    button2.config(text = "Restart", state = tk.NORMAL, command = restart_game)
    button3.config(text = "", state = tk.DISABLED)
    if get_next_player(grid) != player:
        make_move_by_id(moves[grid])
    if not check_grid():
        activate_buttons()
def choose_difficulty(difficulty):
    if difficulty == 1:
        for state in distance.keys():
            if types[state] != 0 and (distance[state] == 1 or distance[state] == 2):
                starting_grids.append(state)
    elif difficulty == 2:
        for state in distance.keys():
            if types[state] != 0 and (distance[state] == 3 or distance[state] == 4):
                starting_grids.append(state)
    else:
        for state in distance.keys():
            if types[state] != 0 and distance[state] == 5:
                starting_grids.append(state)
    for i in range(n_cell):
        grid_buttons[i].config(text = "", font = ("Helvetica", 40), command = lambda row = i // side, col = i % side: click(row, col))
    restart_game()
dfs(0)
game = tk.Tk()
game.title("Tic-Tac-Toe: Find the Win")
for i in range(n_cell):
    button = tk.Button(game, text = "", font = ("Helvetica", 40), width = 5, height = 2)
    button.grid(row = i // side, column = i % side, sticky = "nsew")
    grid_buttons.append(button)
button1 = tk.Button(game, text = "", height = 3)
button2 = tk.Button(game, text = "", height = 3)
button3 = tk.Button(game, text = "", height = 3)
button1.grid(row = 3, column = 0, columnspan = 1, sticky = "nsew")
button2.grid(row = 3, column = 1, columnspan = 1, sticky = "nsew")
button3.grid(row = 3, column = 2, columnspan = 1, sticky = "nsew")
grid_buttons[1].config(text = "Choose difficulty", font = ("", 15))
grid_buttons[3].config(text = "Easy", font = ("", 15), command = lambda: choose_difficulty(1))
grid_buttons[4].config(text = "Medium", font = ("", 15), command = lambda: choose_difficulty(2))
grid_buttons[5].config(text = "Hard", font = ("", 15), command = lambda: choose_difficulty(3))
game.mainloop()