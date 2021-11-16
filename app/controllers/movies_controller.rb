class MoviesController < ApplicationController

    def index
        movies = Movie.all
        render json: movies
    end

    def create
        movie = Movie.new(movie_params)

        if movie.save
            render json: movie.to_json
        else    
            render json: {error: "There was an error"}
        end
    end

    def show
        begin 
            movie = Movie.find(params[:id])
        rescue 

        end 
        if movie
             render json: movie   
        else
            render json: {error: "There was an error"}
        end
    end

    def update 
        begin 
            movie = Movie.find(params[:id])
        rescue 

        end 
        if movie.update(movie_params)
             render json: movie   
        else
            render json: {error: "There was an error"}
        end
    end

    def delete
        begin 
            movie = Movie.find(params[:id])
        rescue 

        end 
        if movie
                movie.delete
             render json: movie   
        else
            render json: {error: "There was an error"}
        end
    end



    private

    def movie_params
        params.require(:movie).permit(:title, :description)
    end
end
