# You are controlling a robot that is located somewhere in a room. The room is modeled as an m x n binary grid where 0 represents a wall and 1 represents an empty slot.
# The robot starts at an unknown location in the room that is guaranteed to be empty, and you do not have access to the grid, but you can move the robot using the given API Robot.
# You are tasked to use the robot to clean the entire room (i.e., clean every empty cell in the room). The robot with the four given APIs can move forward, turn left, or turn right. Each turn is 90 degrees.
# When the robot tries to move into a wall cell, its bumper sensor detects the obstacle, and it stays on the current cell.
# Design an algorithm to clean the entire room using the following APIs:
#
# interface Robot {
#   // returns true if next cell is open and robot moves into the cell.
#   // returns false if next cell is obstacle and robot stays on the current cell.
#   boolean move();
#
#   // Robot will stay on the same cell after calling turnLeft/turnRight.
#   // Each turn will be 90 degrees.
#   void turnLeft();
#   void turnRight();
#
#   // Clean the current cell.
#   void clean();
# }
#
# Note that the initial direction of the robot will be facing up. You can assume all four edges of the grid are all surrounded by a wall.
#
# Custom testing:
# The input is only given to initialize the room and the robot's position internally. You must solve this problem "blindfolded". In other words, you must control the robot using only the four mentioned APIs without knowing the room layout and the initial robot's position.
#
# Example 1:
#
# Input: room = [[1,1,1,1,1,0,1,1],[1,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1]], row = 1, col = 3
# Output: Robot cleaned all rooms.
# Explanation: All grids in the room are marked by either 0 or 1.
# 0 means the cell is blocked, while 1 means the cell is accessible.
# The robot initially starts at the position of row=1, col=3.
# From the top left corner, its position is one row below and three columns right.
#
# Example 2:
#
# Input: room = [[1]], row = 0, col = 0
# Output: Robot cleaned all rooms.
#
# Constraints:
#
# m == room.length
# n == room[i].length
# 1 <= m <= 100
# 1 <= n <= 200
# room[i][j] is either 0 or 1.
# 0 <= row < m
# 0 <= col < n
# room[row][col] == 1
# All the empty cells can be visited from the starting position.


# """
# This is the robot's control interface.
# You should not implement it, or speculate about its implementation
# """
# class Robot:
#    def move(self):
#        """
#        Returns true if the cell in front is open and robot moves into the cell.
#        Returns false if the cell in front is blocked and robot stays in the current cell.
#        :rtype bool
#        """
#
#    def turnLeft(self):
#        """
#        Robot will stay in the same cell after calling turnLeft/turnRight.
#        Each turn will be 90 degrees.
#        :rtype void
#        """
#
#    def turnRight(self):
#        """
#        Robot will stay in the same cell after calling turnLeft/turnRight.
#        Each turn will be 90 degrees.
#        :rtype void
#        """
#
#    def clean(self):
#        """
#        Clean the current cell.
#        :rtype void
#        """


# DFS (Spiral Backtracking)
# Mark the cell as visited and clean it up.
# Explore 4 directions : up, right, down, and left (the order is important since the idea is always to turn right) :
# Check the next cell in the chosen direction :
#   If it's not visited yet and there is no obstacles :
#     1. Move forward.
#     2. Explore next cells backtrack(new_cell, new_direction).
#     3. Backtrack, i.e. go back to the previous cell.
#   Turn right because now there is an obstacle (or a virtual obstacle) just in front.
class Solution:
    def cleanRoom(self, robot):
        """
        :type robot: Robot
        :rtype: None
        """

        def go_back():
            robot.turnRight()
            robot.turnRight()
            robot.move()
            robot.turnRight()
            robot.turnRight()

        def go(x, y, dir):
            robot.clean()
            for d in range(4):
                new_dir = (dir + d) % 4
                dx, dy = dirs[new_dir]
                i = x + dx
                j = y + dy
                if (i, j) not in visited and robot.move():
                    visited.add((i, j))
                    go(i, j, new_dir)
                    go_back()
                robot.turnRight()

        # Go clockwise : 0: 'up', 1: 'right', 2: 'down', 3: 'left'
        # Note order matters
        dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]

        # Assume initially the robot is at (0, 0), we can go any direction
        visited = {(0, 0)}
        go(0, 0, 0)
