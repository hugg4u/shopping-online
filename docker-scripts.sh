#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to start services
start_services() {
    print_status "Starting MySQL and Server..."
    docker compose up -d
    print_success "Services started! Access:"
    echo "  - Server API: http://localhost:8080"
    echo "  - Adminer (DB Manager): http://localhost:8081"
    echo "  - MySQL: localhost:3306"
}

# Function to start only MySQL
start_mysql() {
    print_status "Starting only MySQL..."
    docker compose up -d mysql adminer
    print_success "MySQL started! Access:"
    echo "  - Adminer (DB Manager): http://localhost:8081"
    echo "  - MySQL: localhost:3306"
}

# Function to stop services
stop_services() {
    print_status "Stopping all services..."
    docker compose down
    print_success "All services stopped!"
}

# Function to restart services
restart_services() {
    print_status "Restarting services..."
    docker compose down
    docker compose up -d
    print_success "Services restarted!"
}

# Function to view logs
show_logs() {
    if [ -z "$1" ]; then
        print_status "Showing logs for all services..."
        docker compose logs -f
    else
        print_status "Showing logs for $1..."
        docker compose logs -f "$1"
    fi
}

# Function to reset database
reset_database() {
    print_warning "This will delete all data in the database!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Resetting database..."
        docker compose down
        docker volume rm shopping-online_mysql_data 2>/dev/null || true
        docker compose up -d mysql
        print_success "Database reset complete!"
    else
        print_status "Database reset cancelled."
    fi
}

# Function to run prisma commands
run_prisma() {
    if [ -z "$1" ]; then
        print_error "Please specify a Prisma command (e.g., db push, generate, studio)"
        return 1
    fi
    
    print_status "Running Prisma command: $*"
    docker compose exec server npx prisma "$@"
}

# Function to show help
show_help() {
    echo "Docker Management Script for Shopping Online Project"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start, up        Start all services (MySQL + Server)"
    echo "  mysql           Start only MySQL and Adminer"
    echo "  stop, down      Stop all services"
    echo "  restart         Restart all services"
    echo "  logs [service]  Show logs (optional: specify service name)"
    echo "  reset-db        Reset database (WARNING: deletes all data)"
    echo "  prisma [cmd]    Run Prisma commands (e.g., 'db push', 'studio')"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start                    # Start all services"
    echo "  $0 mysql                    # Start only MySQL"
    echo "  $0 logs server              # Show server logs"
    echo "  $0 prisma db push           # Push database schema"
    echo "  $0 prisma studio            # Open Prisma Studio"
}

# Main script logic
case "$1" in
    "start"|"up")
        start_services
        ;;
    "mysql")
        start_mysql
        ;;
    "stop"|"down")
        stop_services
        ;;
    "restart")
        restart_services
        ;;
    "logs")
        show_logs "$2"
        ;;
    "reset-db")
        reset_database
        ;;
    "prisma")
        shift
        run_prisma "$@"
        ;;
    "help"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac 